import SweetAlert from "sweetalert2"

export const Swal = SweetAlert.mixin({
  // confirmButtonColor: "#3085d6",
  // cancelButtonColor: "#d33",
  // buttonsStyling: true,
  width: "23.75rem",
  customClass: {
    confirmButton: "btn btn-dark w-100",
    icon: "mt-0",
    popup: "px-10 py-10 rounded-10",
    title: "px-0",
    htmlContainer: "px-0",
    actions: "w-100",
  },
})
