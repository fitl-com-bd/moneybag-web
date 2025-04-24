"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const NotFound = () => {
  const router = useRouter()
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
      <Image
        src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
        alt="404"
        sizes="30%"
        width={400}
        height={300}
      />
      <h2 className="mb-2 fw-bold">Page Not Found</h2>
      <p className="lead text-muted">Sorry, the page you are looking for does not exist.</p>
      <button type="button" onClick={() => router.back()} className="btn btn-danger text-white mt-3">
        Go Home
      </button>
    </div>
  )
}

export default NotFound
