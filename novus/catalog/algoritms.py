

def min_time(goods_services):
    # GoodService.objects()
    dictionary = dict()
    for item in goods_services:
        if item.good in dictionary:
            if dictionary[item.good].time > item.time:
                dictionary[item.good] = item
        else:
            dictionary[item.good] = item
    return dictionary
