export interface Estado
{
    id: number,
    sigla: string,
    nome: string,
    regiao: {
      id: number,
      sigla: string,
      nome: string
    }
}