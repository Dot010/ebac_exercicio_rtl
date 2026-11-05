import { fireEvent, render, screen } from '@testing-library/react';
import Post from '.';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {

    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve inserir dois comentários corretamente', () => {
        render(<PostComment/>);

        const textarea = screen.getByTestId('post-comments-textarea');
        const botao = screen.getByTestId('post-comments-button');

        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(botao);

        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(botao);

        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário')).toBeInTheDocument();

        const comentarios = screen.getAllByTestId('post-comment-item');
        expect(comentarios).toHaveLength(2);
    });

});


{/*Explicando de cima a baixo, tipo narrando um filme

Linha 1-3: importa as ferramentas que vamos usar — render (desenha o componente na tela de teste), screen (procura elementos), fireEvent (simula ações do usuário), e o próprio componente Post/PostComment.

Linha 5: describe é só uma "caixa" que agrupa testes relacionados, com um nome pra organizar.

Linhas 7-10: teste 1, que já existia — só confirma que o componente aparece na tela (procura o texto "Comentar").

Linha 12: teste 2, o que eu criei — o nome descreve o que ele vai verificar.

Linha 13: render(<PostComment/>) → desenha o componente na "tela virtual" do teste, do zero, do jeitinho que apareceria pro usuário.

Linhas 15-16: aqui a gente acha os dois elementos que vamos usar, usando aqueles post-its (data-testid) que adicionamos no componente:

typescript
const textarea = screen.getByTestId('post-comments-textarea');  // acha a caixa de texto
const botao = screen.getByTestId('post-comments-button');        // acha o botão

Linhas 18-19: simula o primeiro comentário:

typescript
fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });  // "digita" o texto
fireEvent.click(botao);                                                     // "clica" no botão

É como se um robô estivesse digitando "Primeiro comentário" na caixa de texto, e depois apertando o botão de enviar.

Linhas 21-22: faz exatamente a mesma coisa, só que com "Segundo comentário" — simulando o usuário mandando um segundo comentário logo em seguida.

Linhas 24-25: depois de tudo isso, a gente checa se os dois textos realmente apareceram na tela:

typescript
expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
expect(screen.getByText('Segundo comentário')).toBeInTheDocument();

Tradução: "eu espero que o texto 'Primeiro comentário' esteja presente na página" e "eu espero que 'Segundo comentário' também esteja".

Linhas 27-28: por fim, uma checagem extra — conta quantos itens de comentário existem na lista: /*}