#include<bits/stdc++.h>

using namespace std;

struct Coordinate {
  int x, y, z;

  bool operator < (Coordinate otherCoor)const {
    if(x == otherCoor.x){
      if(y == otherCoor.y)
        return z < otherCoor.z;
      return y < otherCoor.y;
    }
    return x < otherCoor.x;
  }

};

struct Input {

  const string UPDATE = "UPDATE";
  const string QUERY = "QUERY";

  // Reads a number
  int readInt() {
    int number;
    cin >> number;
    return number;
  }

  //  Reads type of query and returns '0' if is an update or 1 otherwise
  int readTypeOfQuery() {
    string typeOfQuery;

    cin >> typeOfQuery;

    if(typeOfQuery == UPDATE) {
      return 0;
    }
    return 1;
  }

  Coordinate readCoor(){
    Coordinate coor;
    cin >> coor.x >> coor.y >> coor.z;
    return coor;
  }

};

struct Matrix {
  map<Coordinate, int> coordinates;

  // Updates the value in a Coordinate
  void updateCoordinate(Coordinate coordinate, int value) {
    coordinates[coordinate] = value;
  }

  // Checks if currentCoor is between firstCoor and secondCorr in all its dimensions
  bool checkIfInside(Coordinate currentCoor, Coordinate firstCoor, Coordinate secondCoor){
    if(currentCoor.x >= firstCoor.x && currentCoor.y >= firstCoor.y && currentCoor.z >= firstCoor.z &&
      currentCoor.x <= secondCoor.x && currentCoor.y <= secondCoor.y && currentCoor.z <= secondCoor.z) {
      return true;
    }
    return false;
  }

  // Gets the sum of the values between firstCoor and secondCorr inclusive
  long long getSum(Coordinate firstCoor, Coordinate secondCoor) {
    long long result = 0;
    for(auto coor : coordinates){
      if(checkIfInside(coor.first, firstCoor, secondCoor)) {
        result += (long long)(coor.second);
      }
    }
    return result;
  }
};

struct Printer{

  void printNumber(long long number) {
    cout << number << '\n';
  }

  void printCoordinate(Coordinate coordinate){
    cout << "COORDINATE " << coordinate.x << " " << coordinate.y << " " << coordinate.z << " " << endl;
  }
};

int main() {
  int T, N, M;
  Input input;
  Printer printer;

  T = input.readInt();

  while(T --) {
    Matrix matrix;
    N = input.readInt();
    M = input.readInt();

    for(int i = 0; i < M; i ++) {
      // Is an update
      if(input.readTypeOfQuery() == 0) {
        Coordinate coor = input.readCoor();
        int value = input.readInt();
        matrix.updateCoordinate(coor, value);
      } else {
        Coordinate firstCoor = input.readCoor();
        Coordinate secondCoor = input.readCoor();
        long long result = matrix.getSum(firstCoor, secondCoor);
        printer.printNumber(result);
      }
    }
  }

  return 0;
}
