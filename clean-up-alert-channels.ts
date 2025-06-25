/**
 * Delete a list of resources via the Checkly API.
 */

import { getListFromApi, getFromApi, deleteFromApi } from './helpers'
import jp from 'jsonpath'
import * as fs from 'fs'
import { argv } from 'node:process'

/**
 * Some basic info about each deleted alert channel will be written to this file.
 */
const FILENAME = process.argv[2]

/**
 * Use this option to test the script and not delete anything.
 */
const isDryRun = process.argv[3] === '--dry-run'

let total = 0
let page = 1
let data = null
let prependLabel = isDryRun ? '[DRY RUN] ' : ''

if(fs.existsSync(FILENAME)) {
  console.log(`File ${FILENAME} already exists. Please delete this file or use a different filename.`)
  process.exit(1)
} else {
  fs.writeFile(FILENAME, `id,type,email_address,name,webhook_url,subscribers_count\n`, { flag: 'a+' }, err => {
    if (err) {
      console.error(err);
      process.exit(1)
    }
  })
}

// Iterate through all alert channels in this account
while(({data} = await getListFromApi('https://api.checklyhq.com/v1/alert-channels', page)) && data.length) {
  console.log('Page', page)

  for(let i = 0; i < data.length; i++) {
    const channel = data[i]
    let isDelete = false

    // check if email alert channel is invalid. If invalid, mark for deletion.
    if(channel.type === 'EMAIL') {
      isDelete = isDelete || (!channel.config.address || !channel.config.address.includes('@'))
    }

    // check if webhook title contains a certain string. If it does, mark for deletion.
    if(channel.type === 'WEBHOOK') {
      isDelete = isDelete || channel.config.name.includes('jonathan-example')
    }

    // check if alert channel has subscribers. If no subscribers, mark for deletion.
    const numActiveSubs = jp.query(channel, '$..subscriptions[?(@.activated == true)].id').length
    isDelete = isDelete || numActiveSubs == 0
    
    if(isDelete) {
      fs.writeFile(FILENAME, `${channel.id},${channel.type},${channel.config.address},${channel.config.name},${channel.config.url},${numActiveSubs}\n`, { flag: 'a+' }, err => {
        if (err) {
          console.error(err);
          process.exit(1)
        }
      })

      if(!isDryRun) {
        const response = await deleteFromApi('https://api.checklyhq.com/v1/alert-channels', channel.id)  
      }

      total ++
    }

    if(total % 10 == 0) {
      console.log(`${prependLabel}Deleted ${total} so far ...`)
    }
  }

  page ++
}

console.log(`${prependLabel}Finished deleting ${total} alert channel(s)`)