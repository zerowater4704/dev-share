import CardList from './componets/CardList'

const page = async () => {
  // const fetchMongo = async () => {
  //   const res = await fetch("http://localhost:3000/api/projects", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     cache: 'no-store',
  //   })

  //   return res
  // }

  // const data = await fetchMongo()
  // console.log(data)

  return (
    <div className="size-full">
      <CardList />
    </div>
  )
}

export default page
