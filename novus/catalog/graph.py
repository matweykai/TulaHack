class Node:  # точки

    def __init__(self, data, indexloc=None):
        self.data = data
        self.index = indexloc


class Graph:  # граф

    @classmethod
    def create_from_nodes(self, nodes):
        return Graph(len(nodes), len(nodes), nodes)

    def __init__(self, row, col, nodes=None):
        # установка матрицы смежности(для напр. графа)
        self.adj_mat = [[[0, 0]] * col for _ in range(row)]
        self.nodes = nodes
        for i in range(len(self.nodes)):
            self.nodes[i].index = i

    def connect_dir(self, node1, node2, weight=1, time=0):
        node1, node2 = self.get_index_from_node(node1), self.get_index_from_node(node2)
        self.adj_mat[node1][node2] = [weight, time]

    # Опциональный весовой аргумент для поддержки алгоритма Дейкстры
    def connect(self, node1, node2, weight=1, time=0):
        self.connect_dir(node1, node2, weight, time)

    #    self.connect_dir(node2, node1, weight, time)

    # Получает ряд узла, отметить ненулевые объекты с их узлами в массиве self.nodes
    # Выбирает любые ненулевые элементы, оставляя массив узлов
    # которые являются connections_to (для ориентированного графа)
    # Возвращает значение: массив кортежей (узел, вес)
    def connections_from(self, node):
        node = self.get_index_from_node(node)
        return [(self.nodes[col_num], self.adj_mat[node][col_num]) for col_num in range(len(self.adj_mat[node]) // 2) if
                self.adj_mat[node][col_num] != [0, 0]]

    # Проводит матрицу к столбцу узлов
    # Проводит любые ненулевые элементы узлу данного индекса ряда
    # Выбирает только ненулевые элементы
    # Обратите внимание, что для неориентированного графа
    # используется connections_to ИЛИ connections_from
    # Возвращает значение: массив кортежей (узел, вес)
    def connections_to(self, node):
        node = self.get_index_from_node(node)
        column = [row[node] for row in self.adj_mat]
        return [(self.nodes[row_num], column[row_num]) for row_num in range(len(column)) if column[row_num] != 0]

    def node(self, index):
        return self.nodes[index]

    # Может пройти от node1 к node2
    def can_traverse_dir(self, node1, node2):
        node1, node2 = self.get_index_from_node(node1), self.get_index_from_node(node2)
        return self.adj_mat[node1][node2] != [0, 0]

    # Получает вес, представленный перемещением от n1
    # к n2. Принимает номера индексов ИЛИ объекты узлов
    def get_weight(self, n1, n2):
        node1, node2 = self.get_index_from_node(n1), self.get_index_from_node(n2)
        return self.adj_mat[node1][node2]

    # Разрешает проводить узлы ИЛИ индексы узлов
    def get_index_from_node(self, node):
        if not isinstance(node, Node) and not isinstance(node, int):
            raise ValueError("node must be an integer or a Node object")
        if isinstance(node, int):
            return node
        else:
            return node.index

    # функция поиска самой дешёвой комбинации
    def greedy_zero(self, start, goods):  # start - начальная точка, goods - список товаров
        d = dict()  # словарь для вывода стоимости, времени, путей для всех товаров
        for i in range(len(goods)):

            # стоимость, если проходить с конца

            min1 = float('inf')  # минимальная стоимость 1-го пути
            min_node1 = None  # минимальная точка в конце 1-го пути
            min2 = float('inf')  # минимальная стоимость 1-го пути
            min_node2 = None  # минимальная точка в конце 2-го пути
            path12 = None  # путь до точки
            time_ = 0
            for (node, weight) in self.connections_from(goods[i]):
                if weight[0] < min1:
                    if weight[0] != 0.1:
                        min1 = weight[0]
                    else:
                        min1 = 0
                    min_node1 = node
                    time_ = weight[1]
            for (node, weight) in self.connections_from(min_node1):
                if weight[0] != 0.1:
                    min2 = weight[0]
                else:
                    min2 = 0
                min_node2 = node
            if min_node2 is not None:
                path12 = [min_node2.data, min_node1.data, goods[i].data]  # путь

            # стоимость, если проходить с начала

            min3 = float('inf')
            min_node3 = None
            min4 = float('inf')
            min_node4 = None
            path34 = None
            time__ = 0
            for (node, weight) in self.connections_to(start):
                if weight[0] < min3:
                    if weight[0] != 0.1:
                        min3 = weight[0]
                    else:
                        min3 = 0
                    min_node3 = node
            if self.can_traverse_dir(min_node3, goods[i]):
                if self.get_weight(min_node3, goods[i]) != 0.1:
                    min4 = self.get_weight(min_node3, goods[i])[0]
                else:
                    min4 = 0
                min_node4 = goods[i]
                time__ = self.get_weight(min_node3, goods[i])[1]
                path34 = [start.data, min_node3.data, min_node4.data]  # путь
            if (min1 + min2) < (min3 + min4):
                self.connect(min_node1, min_node2, 0.1, 0)  # обнуляем доставку, т.к. её надо учесть только 1 раз
                d.update({(min1 + min2, time_): path12})  # добавляем товар в вывод
            else:
                self.connect(min_node3, start, 0.1, 0)  # обнуляем доставку, т.к. её надо учесть только 1 раз
                d.update({(min3 + min4, time__): path34})  # добавляем товар в вывод
        return d

    # функция поиска оптимальной комбинации
    def greedy_zero_opt(self, start, goods):  # start - начальная точка, goods - список товаров
        d = dict()  # словарь для вывода стоимости, времени, путей для всех товаров
        for i in range(len(goods)):

            # стоимость, если проходить с конца

            min1 = float('inf')  # минимальная стоимость 1-го пути
            min_node1 = None  # минимальная точка в конце 1-го пути
            min2 = float('inf')  # минимальная стоимость 1-го пути
            min_node2 = None  # минимальная точка в конце 2-го пути
            path12 = None  # путь до точки
            time_ = 0
            for (node, weight) in self.connections_from(goods[i]):
                if ((weight[1] <= 0.65 * time_ and time_ != 0) or time_ == 0) and weight[0] <= 1.25 * min1:
                    if weight[0] != 0.1:
                        min1 = weight[0]
                    else:
                        min1 = 0
                    min_node1 = node
                    time_ = weight[1]
            for (node, weight) in self.connections_from(min_node1):
                if weight[0] != 0.1:
                    min2 = weight[0]
                else:
                    min2 = 0
                min_node2 = node
            if min_node2 is not None:
                path12 = [min_node2.data, min_node1.data, goods[i].data]  # путь

            # стоимость, если проходить с начала

            min3 = float('inf')
            min_node3 = None
            min4 = float('inf')
            min_node4 = None
            path34 = None
            time__ = 0
            for (node, weight) in self.connections_to(start):
                if weight[0] != 0.1:
                    min3 = weight[0]
                else:
                    min3 = 0
                min_node3 = node
            if self.can_traverse_dir(min_node3, goods[i]):
                weight = self.get_weight(min_node3, goods[i])
                if ((weight[1] <= 0.65 * time__ and time__ != 0) or time__ == 0) \
                        and self.get_weight(min_node3, goods[i])[0] <= 1.25 * min4:
                    if self.get_weight(min_node3, goods[i])[0] != 0.1:
                        min4 = self.get_weight(min_node3, goods[i])[0]
                    else:
                        min4 = 0
                    min_node4 = goods[i]
                    time__ = self.get_weight(min_node3, goods[i])[1]
                    path34 = [start.data, min_node3.data, min_node4.data]  # путь
            if (min1 + min2) < (min3 + min4):
                self.connect(min_node1, min_node2, 0.1, 0)  # обнуляем доставку, т.к. её надо учесть только 1 раз
                d.update({(min1 + min2, time_): path12})  # добавляем товар в вывод
            else:
                self.connect(min_node3, start, 0.1, 0)  # обнуляем доставку, т.к. её надо учесть только 1 раз
                d.update({(min3 + min4, time__): path34})  # добавляем товар в вывод
        return d
