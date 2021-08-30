# ---------------------------- FUNÇÕES ----------------------------
def clausula():
    return [
    [1, 2],
    [1, -2],
    [-1, 2]
]

def valorar(k):
    if k > 0:
        return 'V'
    return 'F'

#Resgatar todas as clausulas unitarias
def ClausulasUnitarias(Cl):
    global u
    for x in Cl:
        if len(x) == 1:
            u.append(x[0])

#Remove uma clausula por completo
def removerClausulas(x):
    global u
    if u[0] in x:
        if u[0] > 0:
            print('O {} é verdadeiro, então removemos a clausula {}'.format(u[0],x))
        else:
            print('O {} é falso, então removemos a clausula {}'.format(u[0],x))
        return False
    return True

#Remove o atomo da clausula
def removeAtomo(x):
    global u
    if u[0] * -1 in x:
        if u[0] > 0:
            print('O {} é verdadeiro, então removemos o {} da clausula'.format(u[0],u[0]*-1))
        else:
            print('O {} é falso, então removemos o {} da clausula'.format(u[0],u[0]*-1))
        x.pop(x.index(u[0]*-1))
        return x
    return x

#Algoritimo simplifica, pode ser chamado de duas formas, passando uma clausula unitaria como argumento ou não passando nada.
def simplifica(a = ''):
    Cl = C.copy()
    #Se caso não seja passada uma clausula unitaria, irei buscar elas diretamente
    if a == '':
        ClausulasUnitarias(Cl)
    else:
        u.append(a)

    #Enquanto existir clausulas unitarias
    while len(u) != 0:
        print('\nClausulas a serem analisadas: ')
        for x in Cl:
            print(x)
        print('\nOperações: ')
        #Removo as clausulas que contem as clausulas unitarias
        Cl = list(filter(removerClausulas, Cl))
        #Removo as clausulas unitarias com o valor inverso
        Cl = list(map(lambda x: removeAtomo(x), Cl))
        u.pop(0)
    
    #Retorno a clausula simplificada
    return Cl

#Verifico se a clausula possui bottom
def bottom(Cl):
    for x in Cl:
        if len(x) == 0:
            return True
    return False

#----------------------------------------------------------------------------------

#Clausulas unitarias
u = []

#Clausula
C = clausula()

#Simplificação - Boolean constraint propagation
C = simplifica()

#2SAT
while len(C) != 0 and not bottom(C):
    #Escolho uma clausula unitaria qualquer
    a = C[0][0]

    #Chamo o algoritmo simplifica passando ela como argumento
    Cl = simplifica(a)

    #Verifico se possui bottom
    if bottom(Cl):
        print("\nOcorreu bottom, chamo simplifica com o valor inverso!")
        #Se sim, chamo a função simplifica com o valor inverso da clausula unitaria escolhida anteriormente
        Cl = simplifica(a*-1)
    else:
        #Se não atualizo C, com as novas clusulas C'
        C = Cl

#Se possui bottom ou a clausula não está vazia então não é satisfazivel.
if bottom(C) and len(C) != 0:
    print("\nNÃO É SATISFAZIVEL")
else:
    print("\nÉ SATISFAZIVEL")