class Solution:

    def makeNeg(self, a):
        for counter in range(len(a)-1):
            if a[counter] == "0":
                a[counter] == "1"
            elif a[counter] == "1":
                a[counter] == "0"
        print(a)    
        return a

    def addBinary(self, a: str, b: str) -> str:
        s = 0
        c = 0
        result = ''

        print(a[0], b[0])
        if a[0] == "-":
            a = self.makeNeg(a[1:])
            a = "1" + a

        else:
            a = "0" + a
        
        if b[0] == "-":
            b = self.makeNeg(b[1:])
            b = "1" + a
        else:
            b = "0" + b

        print(a, b)
        if len(a) < len(b):         
             
            i = 1
            while len(a) < len(b):
                a = f"{0*i}{a}"
                i = i+1


        if len(b) < len(a):
            i = 1
            while len(b) < len(a):
                b = f"{0*i}{b}"
                i = i+1
        a = a[::-1]
        b = b[::-1]
        
        for counter in range(len(a)):
            ba = int(a[counter])
            bb = int(b[counter])
            s = (ba ^ bb) ^ c
            c = (ba and bb) or (c and (ba^bb))
            
            result = result + str(s)

        if c == 1:
            result += str(c)
        return result[::-1]



    
    def getSum(self, a: int, b: int) -> int:
        a = bin(a).replace("0b", "")
        b = bin(b).replace("0b", "")
        print(a)
        print(b)
        return int(self.addBinary(a,b), 2)


sol = Solution()
print(sol.getSum(-1, 10))
