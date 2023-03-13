import unittest
import json
# from plus import plus
import os

def plus(arg1, arg2):
    return arg1 + arg2



class TestPlus(unittest.TestCase):
    '''
    def test_plus(self):
        actual_result = plus(1, 1)
    
        self.assertEqual(actual_result, 3)
    '''

    def test_has_related(self):

        dir_path = os.path.dirname(os.path.realpath(__file__))

        with open(f"{dir_path}/tmp/index.json", encoding="utf-8") as f:
            df = json.load(f)

        item = None

        for e in df:
            if e["_id"] == "en-00092577":
                item = e
                break

        self.assertTrue(item is not None)

        self.assertTrue("related" in item)

        self.assertTrue(len(item["related"]) > 0)


