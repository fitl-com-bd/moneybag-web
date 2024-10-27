import Link from "next/link"

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1
        className="fw-bolder text-danger"
        style={{
          fontSize: "10rem",
        }}>
        404
      </h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-dark mt-3">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
