
let numero: number = 2021 //variável do tipo number.
let mensagem: string = "Olá, mundo!" //variável do tipo string.
let visualizado: boolean = false //variável do tipo boolean.
let numerosPares: number[] = [0, 2, 4, 6, 8, 10] //variável do tipo array de number.
let numerosImpares: Array<number> = [1, 3, 5, 7, 9] //variável do tipo array de number.
let estado: [number, string] = [0, "Alterado nenhuma vez"] //variável do tipo tuple.
let desconhecido: unknown = 3 //variável do tipo unknow.
let qualquer: any = "";



interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

const user: User = {
  id: 0,
  firstName: 'Maria',
  lastName: 'Silva',
  role: 'Nenhma'
}



console.log(mensagem, user)






function updateUser(id: number, update: Partial<User>) {
  const user: User = getUser(id)
  const newUser = { ...user, ...update }
  saveUser(id, newUser)
}





console.log("numero")
function getUser(id): User {
  return {} as User;
}
function saveUser(id, User) {

}

updateUser(0, {});