export default function({ store, redirect }) {
  if (!store.state.user) {
    redirect('/?message=no_user')
  }
}
