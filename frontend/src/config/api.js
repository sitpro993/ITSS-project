const apiUrl = process.env.API_URL || 'http://localhost:5001'

export const getData = async (url, token, query) => {
  if (query) {
    url += '?' + new URLSearchParams({ searchKey: query }).toString()
  }
  console.log(url)
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })

  const data = await res.json()
  return data
}

export const postData = async (url, post, token) => {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(post),
  })

  const data = await res.json()
  return data
}

export const putData = async (url, post, token) => {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(post),
  })

  const data = await res.json()
  return data
}

export const patchData = async (url, post, token) => {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(post),
  })

  const data = await res.json()
  return data
}

export const deleteData = async (url, token) => {
  const res = await fetch(`${apiUrl}/api/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  const data = await res.json()
  return data
}
