import CardList from './componets/CardList'

const page = async () => {
  const apiurl = 'http://localhost:3000'

  const getDatas = async () => {
    const user = await fetch(`${apiurl}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!user.ok) {
      return 'failed fetch'
    }

    const response = await user.json() // JSONとしてレスポンスを処理

    return response
  }

  const userData = (await getDatas()) as UserType[]

  return (
    <div className="size-full">
      <CardList usersData={userData} />
    </div>
  )
}

export default page
