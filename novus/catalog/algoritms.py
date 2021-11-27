from graph import *

# пример использования:

# start
s = Node("s")

# все сервисы
s1 = Node("serv1")
s2 = Node("serv2")
s3 = Node("serv3")

# все продукты, заказанные пользователем
a = Node("a")
b = Node("b")
p = Node("p")
c = Node("c")

# создаём граф
graph = Graph.create_from_nodes([s, s1, s2, s3, a, b, p, c])
graph1 = Graph.create_from_nodes([s, s1, s2, s3, a, b, p, c])

# сначала добавляем сервисы
graph.connect(s1, s, 100)
graph.connect(s2, s, 200)
graph.connect(s3, s, 150)

graph1.connect(s1, s, 100)
graph1.connect(s2, s, 200)
graph1.connect(s3, s, 150)

# добавляем ТС(стоимость, время)
graph.connect(a, s1, 5, 3)
graph.connect(b, s2, 10, 7)
graph.connect(b, s1, 12, 12)
graph.connect(c, s3, 11, 8)
graph.connect(p, s3, 8, 10)

graph1.connect(a, s1, 5, 3)
graph1.connect(b, s2, 10, 7)
graph1.connect(b, s2, 12, 6)
graph1.connect(b, s1, 12, 12)
graph1.connect(c, s3, 11, 8)
graph1.connect(p, s3, 8, 10)

# если время какого-то товара получилось 0, то путь найти невозможно
print(graph.greedy_zero(s, [a, b, p, c]))  # - т. начала, [a, b, c, p] - продукты
print(graph1.greedy_zero_opt(s, [a, b, p, c]))
