from multiprocessing import Pool

def compute(x):
    return x*x

def run_parallel(data):

    with Pool(4) as p:
        results = p.map(compute,data)

    return results