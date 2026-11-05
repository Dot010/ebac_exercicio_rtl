import { fireEvent, render, screen } from '@testing-library/react';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment />);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve inserir dois comentários corretamente', () => {
        render(<PostComment />);

        const textarea = screen.getByTestId('post-comments-textarea');
        const botao = screen.getByTestId('post-comments-button');

        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(botao);

        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(botao);

        expect(screen.getByText('Primeiro comentário')).toBeInTheDocument();
        expect(screen.getByText('Segundo comentário')).toBeInTheDocument();
        expect(screen.getAllByTestId('post-comment-item')).toHaveLength(2);
    });
});
