# 🖼️ Aula — Upload de Imagens com NestJS

## 📚 Sobre a aula

Nesta aula foi desenvolvido um sistema de **upload de imagens utilizando NestJS, Multer e Express**.

A API recebe uma imagem através de uma requisição `POST`, valida o tipo e o tamanho do arquivo, gera um nome único para evitar conflitos e salva a imagem na pasta `uploads`.

Também foi implementada uma resposta contendo informações do arquivo enviado e uma URL para acesso à imagem.

---

## 🎯 Objetivos da aula

Durante a aula foram trabalhados os seguintes conceitos:

* Upload de arquivos com NestJS;
* Utilização do `FileInterceptor`;
* Integração com o Multer;
* Armazenamento de arquivos no disco;
* Geração de nomes únicos para imagens;
* Utilização de UUID;
* Validação da extensão/tipo do arquivo;
* Limitação do tamanho do arquivo;
* Tratamento de erros com `BadRequestException`;
* Recuperação do arquivo através do `@UploadedFile()`;
* Retorno de informações do arquivo enviado;
* Criação de uma URL para acessar a imagem.

---

## 🛠️ Tecnologias utilizadas

* **Node.js**
* **NestJS**
* **TypeScript**
* **Express**
* **Multer**
* **UUID**
* **Insomnia** para testes da API

---

## 📦 Bibliotecas utilizadas

Foram utilizadas bibliotecas específicas para realizar o upload e manipulação dos arquivos:

```bash
npm install @nestjs/platform-express multer uuid
```

As principais dependências utilizadas no código são:

```typescript
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
```

---

# 📂 Estrutura do projeto

A estrutura utilizada possui a seguinte organização:

```text
projeto/
│
├── src/
│   ├── imagem.controller.ts
│   ├── imagem.module.ts
│   └── ...
│
├── uploads/
│   └── imagens enviadas
│
├── package.json
├── package-lock.json
├── nest-cli.json
└── README.md
```

A pasta:

```text
uploads/
```

é utilizada para armazenar fisicamente as imagens enviadas através da API.

---

# 🚀 Endpoint criado

Foi criado um endpoint para receber as imagens:

```http
POST /imagem/upload
```

Exemplo utilizando o servidor local:

```text
http://localhost:3000/imagem/upload
```

---

# 📤 Como funciona o upload

O Controller utiliza o decorator:

```typescript
@Controller('imagem')
```

Isso define o prefixo:

```text
/imagem
```

Depois foi criado o método:

```typescript
@Post('upload')
```

Com isso, a rota completa fica:

```text
POST /imagem/upload
```

---

# 🔄 FileInterceptor

Para receber o arquivo foi utilizado o:

```typescript
@UseInterceptors(
    FileInterceptor('file', {
        ...
    })
)
```

O nome:

```text
file
```

é o nome do campo que deve ser utilizado no envio da imagem.

No Insomnia, por exemplo, deve ser utilizado:

```text
Multipart Form
```

com o campo:

```text
file
```

e o tipo:

```text
File
```

---

# 💾 Armazenamento da imagem

Foi utilizado o `diskStorage` do Multer:

```typescript
storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        ...
    },
})
```

Isso determina que os arquivos enviados serão armazenados na pasta:

```text
./uploads
```

---

# 🆔 Geração de nome único

Para evitar que arquivos com o mesmo nome sejam sobrescritos, foi utilizado o UUID:

```typescript
const nomeArquivo = `${uuidv4()}${extname(file.originalname)}`;
```

Por exemplo, uma imagem chamada:

```text
foto.jpg
```

pode ser salva como:

```text
e8a98f3a-908a-4c40-9a6c-2f3c85ebe325.jpg
```

O UUID gera um identificador praticamente único para cada arquivo.

---

# 🖼️ Preservação da extensão

Foi utilizada a função:

```typescript
extname(file.originalname)
```

Ela identifica a extensão original do arquivo.

Exemplo:

```text
foto.jpg → .jpg
imagem.png → .png
arquivo.webp → .webp
```

Dessa forma, o nome gerado mantém a extensão correta.

---

# 📏 Limite de tamanho

Foi configurado um limite máximo de:

```typescript
limits: {
    fileSize: 2 * 1024 * 1024
}
```

Isso corresponde a aproximadamente:

```text
2 MB
```

Portanto, arquivos maiores que esse limite serão rejeitados pela API.

---

# 🔐 Validação dos tipos de imagem

Também foi criado um filtro para permitir somente determinados formatos:

```typescript
fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        return callback(
            new BadRequestException(
                'Apenas arquivos jpg, jpeg, png, gif e webp são suportados!'
            ),
            false,
        );
    }

    callback(null, true);
}
```

Os formatos permitidos são:

* `.jpg`
* `.jpeg`
* `.png`
* `.gif`
* `.webp`

Arquivos de outros formatos serão rejeitados.

---

# ❌ Tratamento de arquivos inválidos

Foi utilizado o:

```typescript
BadRequestException
```

para informar ao usuário quando existe algum problema na requisição.

Por exemplo, caso nenhum arquivo seja enviado:

```typescript
if (!file) {
    throw new BadRequestException('Nehum arquivo enviado.');
}
```

A API informa que nenhum arquivo foi recebido.

Também é utilizado `BadRequestException` quando o arquivo possui um formato não permitido.

---

# 📥 Recuperando o arquivo enviado

Após o processamento do upload, o arquivo é recuperado através de:

```typescript
@UploadedFile() file: Express.Multer.File
```

Esse objeto contém diversas informações sobre o arquivo enviado.

Entre elas:

```typescript
file.filename
file.size
file.originalname
file.mimetype
```

---

# 📋 Resposta da API

Depois que o upload é realizado com sucesso, a API retorna:

```typescript
return {
    filename: file.filename,
    size: file.size,
    url: `http://localhost:3000/api/uploads/${file.filename}`
};
```

A resposta contém:

### `filename`

Nome gerado para o arquivo.

### `size`

Tamanho do arquivo enviado.

### `url`

Endereço utilizado para acessar a imagem.

Exemplo:

```json
{
    "filename": "e8a98f3a-908a-4c40-9a6c-2f3c85ebe325.jpg",
    "size": 154321,
    "url": "http://localhost:3000/api/uploads/e8a98f3a-908a-4c40-9a6c-2f3c85ebe325.jpg"
}
```

---

# 🧪 Testando no Insomnia

Para testar a API, primeiro execute o projeto:

```bash
npm run start:dev
```

Depois, no Insomnia, crie uma requisição:

```text
POST
http://localhost:3000/imagem/upload
```

No corpo da requisição, selecione:

```text
Multipart Form
```

Adicione um campo:

| Campo  | Tipo | Valor               |
| ------ | ---- | ------------------- |
| `file` | File | Escolher uma imagem |

Escolha uma imagem com uma das extensões permitidas:

```text
.jpg
.jpeg
.png
.gif
.webp
```

Depois envie a requisição.

---

# ✅ Resultado esperado

Quando o upload for realizado corretamente, a API retornará informações semelhantes a:

```json
{
    "filename": "e8a98f3a-908a-4c40-9a6c-2f3c85ebe325.jpg",
    "size": 154321,
    "url": "http://localhost:3000/api/uploads/e8a98f3a-908a-4c40-9a6c-2f3c85ebe325.jpg"
}
```

A imagem também ficará armazenada dentro da pasta:

```text
uploads/
```

---

# ❌ Testando arquivo não permitido

Caso seja enviado um arquivo que não seja uma imagem permitida, a API deverá rejeitar o upload.

Formatos como:

```text
.pdf
.docx
.txt
.zip
```

não estão entre os formatos aceitos.

A mensagem retornada será:

```text
Apenas arquivos jpg, jpeg, png, gif e webp são suportados!
```

---

# 📏 Testando arquivo maior que 2 MB

Também foi configurado um limite de:

```text
2 MB
```

Caso seja enviada uma imagem maior que esse tamanho, o Multer rejeitará o arquivo.

Isso evita que arquivos muito grandes sejam enviados para a aplicação.

---

# 🔄 Fluxo do upload

O funcionamento da API pode ser representado da seguinte maneira:

```text
Cliente
   │
   │ POST /imagem/upload
   │
   │ Multipart Form
   │ file = imagem
   ▼
NestJS
   │
   ▼
FileInterceptor
   │
   ├── Verifica tamanho
   │
   ├── Verifica tipo
   │
   └── Gera nome único
   │
   ▼
Pasta uploads/
   │
   ▼
Arquivo salvo
   │
   ▼
API retorna:
filename
size
url
```

---

# 🧩 Código principal desenvolvido

```typescript
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";

@Controller('imagem')
export class ImagemController {

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',

                filename: (req, file, callback) => {
                    const nomeArquivo =
                        `${uuidv4()}${extname(file.originalname)}`;

                    callback(null, nomeArquivo);
                },
            }),

            limits: {
                fileSize: 2 * 1024 * 1024
            },

            fileFilter: (req, file, callback) => {

                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {

                    return callback(
                        new BadRequestException(
                            'Apenas arquivos jpg, jpeg, png, gif e webp são suportados!'
                        ),
                        false,
                    );
                }

                callback(null, true);
            }
        }),
    )

    uploadFile(@UploadedFile() file: Express.Multer.File) {

        if (!file) {
            throw new BadRequestException(
                'Nenhum arquivo enviado.'
            );
        }

        return {
            filename: file.filename,
            size: file.size,
            url: `http://localhost:3000/api/uploads/${file.filename}`
        };
    }
}
```

---

# 📚 O que foi aprendido

Ao finalizar a aula, foi possível compreender como:

* Criar uma rota de upload no NestJS;
* Receber arquivos através de requisições HTTP;
* Utilizar o Multer para gerenciamento dos arquivos;
* Salvar imagens no disco;
* Criar nomes únicos utilizando UUID;
* Manter a extensão original do arquivo;
* Limitar o tamanho dos uploads;
* Validar os formatos permitidos;
* Trabalhar com `BadRequestException`;
* Recuperar arquivos através do `@UploadedFile()`;
* Retornar informações do arquivo através de JSON;
* Testar uploads utilizando o Insomnia.

---

# 📝 Conclusão

Nesta aula foi desenvolvido um sistema completo de **upload de imagens utilizando NestJS e Multer**. A aplicação passou a receber arquivos através de uma requisição `POST`, validar seus formatos e limitar o tamanho máximo permitido.

Também foi implementada a geração automática de nomes únicos utilizando UUID, evitando conflitos entre arquivos. As imagens são armazenadas na pasta `uploads` e a API retorna informações importantes como o nome do arquivo, seu tamanho e uma URL de acesso.

Com essa atividade, foi possível colocar em prática conceitos importantes de **manipulação de arquivos, validação de dados, tratamento de erros e desenvolvimento de APIs no NestJS**, ampliando o conhecimento sobre construção de aplicações back-end.
