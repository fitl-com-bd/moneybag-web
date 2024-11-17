import Link from "next/link"

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
      <img
        src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
        alt="404"
        style={{
          width: "30%",
        }}
      />
      {/* <h1
        className="fw-bolder text-danger lh-1 mb-3"
        style={{
          fontSize: "10rem",
        }}>
        404
      </h1> */}
      <h2 className="mb-2 fw-bold">Page Not Found</h2>
      <p className="lead text-muted">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-danger text-white mt-3">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
