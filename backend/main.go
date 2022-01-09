package main

import (
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/ethclient"
)

var providerToken = "RRXXG62RXYR52G2FUY37CG3E9ZZPCYMT9M"
var web3HttpProvider = "https://bsc-testnet.web3api.com/v1/RRXXG62RXYR52G2FUY37CG3E9ZZPCYMT9M"
var mainNet = "https://mainnet.infura.io"

func main() {
	client, err := ethclient.Dial("https://mainnet.infura.io")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("we have a connection")
	_ = client // we'll use this in the upcoming sections
}
