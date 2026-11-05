import { FormEvent, useState } from 'react';
import styles from './PostComments.module.css';

import Comment from '../../models/Comment';

const Post = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [tempComment, setTempComment] = useState('');

    function handleAddComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const newComment = new Comment(comments.length, tempComment);
        setTempComment('');
        setComments([...comments, newComment]);
    }

    return (
        <div>
            <ul className={styles['post-comments']}>
                {comments.map(({ comment, id }) => (
                    <li className={styles['post-comment']} key={id} data-testid="post-comment-item">
                        <p className={styles['post-comment-content']}>
                            {comment}
                        </p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddComment} className={styles['post-comments-form']}>
                <textarea
                    data-testid="post-comments-textarea"
                    value={tempComment}
                    onChange={e => setTempComment(e.target.value)}
                    required
                    className={styles['post-comments-form-textarea']}
                />
                <button type="submit" data-testid="post-comments-button" className={styles['post-comments-form-button']}>
                    Comentar
                </button>
            </form>
        </div>
    );
}

export default Post;

{/*que cada parte faz (do jeito mais simples possível)
Linhas 6-8: comments é a lista de comentários já adicionados (começa vazia). tempComment guarda o que você tá digitando agora, antes de enviar.
Linhas 10-15: quando você clica em "Comentar", essa função roda. Ela pega o que você digitou, cria um comentário novo, limpa o campo de texto, e adiciona o novo comentário na lista.
Linhas 19-27: desenha a lista de comentários já enviados na tela (o <ul>/<li>).
Linhas 28-39: o formulário — o campo de texto e o botão de enviar.
As 3 coisas que EU adicionei (é literalmente só isso: 3 palavrinhas data-testid="...")
data-testid="post-comment-item" no <li> → dá um "nome/etiqueta" pra cada comentário da lista
data-testid="post-comments-textarea" no <textarea> → dá um "nome/etiqueta" pro campo de texto
data-testid="post-comments-button" no <button> → dá um "nome/etiqueta" pro botão

Por que precisa disso? Pensa assim: o data-testid é tipo colar um post-it com um número em cada elemento da tela, só pra facilitar achar ele depois no teste. Sem esse post-it, o teste teria que "adivinhar" qual elemento é qual (por posição, por classe CSS...) — com o post-it, é certeiro. */}