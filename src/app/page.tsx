import { styled } from "../styles";

const Button = styled('button', {
  backgroundColor: 'Red',
  cursor: 'pointer'
});

export default function Home() {
  return (
    <Button>
      Enviar
    </Button>
  );
}
