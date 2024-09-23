import Card from './componets/Card'

const dummy = ['user1', 'user2', 'user3', 'user4']
const page = () => {
  return (
    <div className="size-full">
      <ul className="mx-auto mt-10 grid h-auto w-11/12 grid-cols-3 gap-4">
        {dummy.map((dummy, index) => (
          <Card key={index} dummy={dummy} />
        ))}
      </ul>
    </div>
  )
}

export default page
