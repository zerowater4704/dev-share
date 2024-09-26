import CardList from './componets/CardList' // パスのスペル修正

const page = async () => {
  const apiurl = 'http://localhost:3000'

  const getDatas = async () => {
    try {
      const userResponse = await fetch(`${apiurl}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      const projectResponse = await fetch(`${apiurl}/api/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (!userResponse.ok || !projectResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const allUsers = (await userResponse.json()) as UserType[]
      const allProjectsResponse = await projectResponse.json()

      const allProjects = Array.isArray(allProjectsResponse)
        ? allProjectsResponse
        : allProjectsResponse.projects || []

      if (!Array.isArray(allProjects)) {
        throw new Error('Expected allProjects to be an array')
      }

      console.log('allProjects:', allProjects)

      const mergedData = allUsers.map((user) => {
        const userProjects = allProjects.filter((project) => project.addedBy === user._id)
        return { ...user, projects: userProjects }
      })

      console.log(mergedData)

      return mergedData
    } catch (error) {
      console.error('Error fetching data:', error)
      return []
    }
  }

  // データを取得
  const userData = (await getDatas()) as UserAndProjectDataType[]

  return (
    <div className="size-full">
      {userData.length > 0 ? (
        <CardList usersData={userData} />
      ) : (
        <p>No data available</p> // データがない場合のフィードバック
      )}
    </div>
  )
}

export default page
