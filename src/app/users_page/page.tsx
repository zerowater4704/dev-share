import CardList from './componets/CardList'

const page = async () => {
  const apiurl = 'http://localhost:3000'

  const getDatas = async () => {
    const res = await fetch(`${apiurl}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return 'failed fetch'
    }

    const response = await res.json() // JSONとしてレスポンスを処理
    return response
  }

  const userData = (await getDatas()) as unknown[]

  return (
    <div className="size-full">
      <CardList />
    </div>
  )
}

export default page
