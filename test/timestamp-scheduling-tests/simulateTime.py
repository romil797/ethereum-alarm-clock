import csv
import random
import matplotlib
import matplotlib.pyplot as plt

MINUTES = 60
HOURS = 60*MINUTES

howLong = 1*HOURS
# pBlock = 0.9

times = []

with open('export-BlockTime.csv', 'rt') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        times.append(row[2])

times = list(map(float, times[1:]))
avgTime = sum(times)/len(times)
allDiff = []
for i in range(5000):
    cTime = 0
    rTime = 0
    while cTime < howLong:
        cTime += random.choice(times)
        rTime += avgTime
    allDiff.append(cTime-rTime)

left = min(allDiff)
right = max(allDiff)
bins = range(int(left), int(right), 1)
plt.hist(allDiff, bins)
plt.show()



