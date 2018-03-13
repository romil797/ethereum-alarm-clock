pragma solidity 0.4.19;

/**
 * @title MathLib
 * Standard SafeMath functions plus some extra goodies.
 */
library MathLib {
    uint constant INT_MAX = 57896044618658097711785492504343953926634992332820282019728792003956564819967;  // 2**255 - 1

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a * b;
        require(a == 0 || c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // require(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // require(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);
        return c;
    }

    /*
     * Return the larger of a or b.  Returns a if a == b.
     */
    function max(uint a, uint b) 
        public pure returns (uint)
    {
        if (a >= b) {
            return a;
        } else {
            return b;
        }
    }

    /*
     * Return the larger of a or b.  Returns a if a == b.
     */
    function min(uint a, uint b) 
        public pure returns (uint)
    {
        if (a <= b) {
            return a;
        } else {
            return b;
        }
    }

    /*
     * Returns a represented as a signed integer in a manner that throw an
     * exception if casting to signed integer would result in a negative
     * number.
     */
    function safeCastSigned(uint a) 
        public pure returns (int)
    {
        assert(a <= INT_MAX);
        return int(a);
    }    
}
