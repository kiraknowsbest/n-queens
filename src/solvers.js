/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // debugger;
  var solution = new Board( {n: n} );
  console.log(n);
  var pieces = 0;
  var startRow = 0;
  var startCol = 0;

  var search = function (row, col) {
    for ( row; row < n; row++ ) {
      for ( col; col < n; col++ ) {
        if ( (solution.hasRowConflictAt(row) === 0) && (solution.hasColConflictAt(col) === 0) ) {
          solution.togglePiece( row, col );
          pieces++;
          if ( pieces === n ) {
            startRow = 0;
            startCol = 0;
            pieces = 0;
            return;
          } else {
            startCol++;
            if ( startCol === n ) {
              startCol = 0;
              startRow++;
            }
            return search( startRow, startCol );
          }
        }
      }
    }
    startCol++;
    if ( startCol === n ) {
      startCol = 0;
      startRow++;
    }
    return search( startRow, startCol );
  };

  search( startRow, startCol );


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solution = new Board( {n: n} );
  var solutionCount = 0;


  //helper function iterates over a row and toggles pieces to run checks
  var rowIncrementChecker = function ( rowIndex ) {
    var currentRow = solution.attributes[rowIndex];
    for ( var i = 0; i < currentRow.length; i++ ) {
      if ( currentRow[i] === 1 ) { // piece exists
        solution.togglePiece( rowIndex, i ); // remove piece
      } else {
        solution.togglePiece( rowIndex, i ); // add piece
        if ( solution.hasAnyRooksConflicts() ) {  // checks for collision
          solution.togglePiece( rowIndex, i );  // if there's a collision, remove it
        }
      }
    }
  };

  // var startRow = 0;
  // var startCol = 0;
  // var pieces = 0;
  // var lastSolution;

  // var search = function (row, col) {
  //   for ( row; row < n; row++ ) {
  //     for ( col; col < n; col++ ) {
  //       if ( (solution.hasRowConflictAt(row) === 0) && (solution.hasColConflictAt(col) === 0) ) {
  //         solution.togglePiece( row, col );
  //         pieces++;
  //         if ( pieces === n ) {
  //           solutionCount++;
            
  //           // startRow = 0;
  //           // startCol = 0;
  //           // pieces = 0;
  //         } else {
  //           startCol++;
  //           if ( startCol === n ) {
  //             startCol = 0;
  //             startRow++;
  //           }
  //           search( startRow, startCol );
  //         }
  //       } else {
  //         startCol++;
  //         if ( startCol === n ) {
  //           startCol = 0;
  //           startRow++;
  //         }
  //         search( startRow, startCol );
  //       }
  //     }
  //   }
  //   startCol++;
  //   if ( startCol === n ) {
  //     return;
  //   }
  // };

  // search( startRow, startCol );

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
