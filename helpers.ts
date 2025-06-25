import * as fs from 'fs'
import axios from 'axios'
import 'dotenv/config'

/**
 * Gets all items from a Checkly API "list all" endpoint.
 */
export const getListFromApi = async (url, page) => {
  return await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${process.env.CHECKLY_API_KEY}`,
        'X-Checkly-Account': process.env.CHECKLY_ACCOUNT_ID
      },
      params: {
        page: page,
        limit: 100,
      }
    }
  )
}

/**
 * Sends a GET request to the given endpoint and id.
 */
export const getFromApi = async (url, id) => {
  return await axios.get(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CHECKLY_API_KEY}`,
        'X-Checkly-Account': process.env.CHECKLY_ACCOUNT_ID
      },
    }
  )
}

/**
 * Sends a DELETE request to the given endpoint and id.
 */
export const deleteFromApi = async (url, id) => {
  return await axios.delete(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CHECKLY_API_KEY}`,
        'X-Checkly-Account': process.env.CHECKLY_ACCOUNT_ID
      },
    }
  )
}