x = [1, 2, 3]
y = [4, 5, 6]
z = [7, 8, 9]

grid = []

for item_x in x:
    for item_y in y:
        for item_z in z:
            grid.append([item_x, item_y, item_z])

import itertools
print([list(point) for point in itertools.product(x, y, z)])


# class SRP:
#     rfft_cache = {}
#
#     def __get_cached_rfft(self, s):
#         key = str(s)  # Brzydkie, ale lepszego pomysłu nie mam, trzeba by liczyć hash, żeby to było jeszcze
#                       # bardziej optymalne
#
#         if key not in self.rfft_cache:
#             self.rfft_cache[key] = np.fft.rfft(s)
#
#         return self.rfft_cache[key]