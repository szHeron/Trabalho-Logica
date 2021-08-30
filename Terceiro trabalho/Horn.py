# ---------------------------- FUNÇÕES ----------------------------
def clausula():
    return [
    [1],
    [1, -2],
    [-1, 2],
    [-1, -3]
]


#Função de valorar
def valorar(k):
    if k > 0:
        return 'V'
    return 'F'

#Resgatar todas as clausulas unitarias
def Fatos(Cl):
    global u
    for x in Cl:
        if len(x) == 1 and x[0] > 0:
            u.append(x[0])

#Remove uma clausula por completo
def removerClausulas(x):
    global u
    if u[0] in x:
        if u[0] > 0:
            print('O {} é verdadeiro, então removemos a clausula {}'.format(u[0],x))
        return False
    return True

#Remove o atomo da clausula
def removeAtomo(x):
    global u
    if u[0] * -1 in x:
        if u[0] > 0:
            print('O {} é verdadeiro, então removemos o {} da clausula'.format(u[0],u[0]*-1))
        x.pop(x.index(u[0]*-1))
        return x
    return x

#Verifico se a clausula possui bottom
def bottom(Cl):
    for x in Cl:
        if len(x) == 0:
            return True
    return False

def Hornsat(Cl):
    global u

    Fatos(Cl)

    while True:
        #Verifico se possui bottom
        if bottom(Cl):
            print("\nNÃO É SATISFAZIVEL, pois possui bottom")
            for x in Cl:
                print(x)
            return False

        if len(u) == 0:
            print("\nÉ SATISFAZIVEL, pois não possui fatos")
            return True

        print('\nClausulas a serem analisadas: ')
        for x in Cl:
            print(x)
        print('\nOperações: ')

        #Removo as clausulas que contem as clausulas unitarias
        Cl = list(filter(removerClausulas, Cl))
        #Removo as clausulas unitarias com o valoor inverso
        Cl = list(map(lambda x: removeAtomo(x), Cl))
        u.pop(0)
        Fatos(Cl)
#----------------------------------------------------------------------------------

#Fatos
u = []

#Clausula
C = clausula()

Hornsat(C)