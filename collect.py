import sys

if len(sys.argv) > 1:
	with open("dump.txt", "w") as f:
		f.write(sys.argv[1])
			