type props={
  title: string
}
function Sidetitle({ title }:props) {

  return (
    <div className=' d-flex home-top m-5'>
    <h1 className='top-heading'>{title}</h1>
  </div>
  )
}

export default Sidetitle
