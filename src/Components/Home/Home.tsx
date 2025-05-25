import home2 from '../../assets/home2.jpeg'

export default function Home() {
  return (
    <div className="homeContainer d-flex justify-content-center text-center p-5">
      <div className='container'>
        <div className="textContainer">
          <h2>Welcome to UMS</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum alias asperiores corrupti accusamus sequi officiis voluptatem rerum! Nisi quia ullam ducimus dignissimos totam accusamus dicta, eveniet magnam hic tempore. Aut, sequi fugit aspernatur similique possimus enim, facilis qui perspiciatis odit voluptate suscipit libero ullam voluptatem numquam id commodi cum mollitia!</p>
        </div>

        <img src={home2} alt="" className='w-75' />
      </div>
    </div>
  )
}
