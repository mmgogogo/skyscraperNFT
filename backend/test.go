package main

import (
	"fmt"
	"github.com/ethereum/go-ethereum/common"
)

func main() {
	// string to common.Address
	address := common.HexToAddress("0x71c7656ec7ab88b098defb751b7401b5f6d8976f")
	fmt.Println(address.Hex()) // 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
}
