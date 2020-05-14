mp_prime = 2

ad_prime = 2

def decodeUID(uid):
	try:
		n = int(uid, 16) - ad_prime
		ret = n // mp_prime
		if ret * mp_prime != n:
			return -1
		else:
			return ret
	except:
		return -1

def encodeUID(id):
	return "%x" % (int(id) * mp_prime + ad_prime)
