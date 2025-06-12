import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  background: '#1a1a1a',
  color: '#00ffcc',
  confirmButtonColor: '#0066cc',
  cancelButtonColor: '#cc0000',
  iconColor: '#00ffcc',
  backdrop: `
    rgba(0,0,0,0.8)
    url("/images/cyber-loader.gif")
    center top
    no-repeat
  `,
  customClass: {
    popup: 'cyber-swal',
    title: 'cyber-swal-title',
    confirmButton: 'cyber-swal-button',
    cancelButton: 'cyber-swal-button'
  }
});

export default Toast;