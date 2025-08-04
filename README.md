# Meu Campus Backend

Backend para o aplicativo Meu Campus.

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```
PORT=4000
HOST=localhost
MONGO_URI=mongodb://localhost:27017
MONGO_DB=meu-campus
API_KEY=
TOKEN_SECRET=
BCRYPT_SALT=10
SMTP_HOST=
SMTP_PORT=587
SMTP_EMAIL=
SMTP_PASSWORD=
FRONTEND_URL=http://localhost:3000
BUCKET_NAME=
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_R2_ENDPOINT=
AWS_SECRET_ACCESS_KEY=
PUBLIC_IMAGE_DEV_URL=
```

### Variáveis de Ambiente

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta em que o servidor irá rodar. |
| `HOST` | Host em que o servidor irá rodar. |
| `MONGO_URI` | URI de conexão com o MongoDB. |
| `MONGO_DB` | Nome do banco de dados no MongoDB. |
| `API_KEY` | Chave de API para acesso à API. |
| `TOKEN_SECRET` | Segredo para geração de tokens JWT. |
| `BCRYPT_SALT` | Salt para o bcrypt. |
| `SMTP_HOST` | Host do servidor SMTP. |
| `SMTP_PORT` | Porta do servidor SMTP. |
| `SMTP_EMAIL` | E-mail para envio de e-mails. |
| `SMTP_PASSWORD` | Senha do e-mail para envio de e-mails. |
| `FRONTEND_URL` | URL do frontend. |
| `BUCKET_NAME` | Nome do bucket no S3. |
| `AWS_REGION` | Região do bucket no S3. |
| `AWS_ACCESS_KEY_ID` | ID da chave de acesso da AWS. |
| `AWS_R2_ENDPOINT` | Endpoint do R2 da Cloudflare. |
| `AWS_SECRET_ACCESS_KEY` | Chave de acesso secreta da AWS. |
| `PUBLIC_IMAGE_DEV_URL` | URL pública para imagens em desenvolvimento. |

## Rodando o projeto

Para rodar o projeto em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```
