import  { Container } from './styles';

//...rest: significa que qq outra props passada que não foi explícita, será repassada para o botão.
//loading = false para caso a props não for informada.
// export function Button(props){
export function Button({title, loading, ...rest}){
  return(
    <Container 
      type="button"
      disabled={loading}
      {...rest}

    >
      {/* {props.title} */}
      {/* if ternário */}
      {loading ? 'Carregando...' : title}
  </Container>
  )
}