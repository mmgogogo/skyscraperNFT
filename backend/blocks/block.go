package blocks

import (
    "context"
    "fmt"
    "log"
    // "math/big"
    "github.com/ethereum/go-ethereum/ethclient"
)

func GetBlockInfo() {
    client, err := ethclient.Dial("https://mainnet.infura.io/v3/735d69b2d035422ab5ff680934b338dc")
    if err != nil {
        log.Fatal(err)
    }

    header, err := client.HeaderByNumber(context.Background(), nil)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(header.Number.String())
    // blockNumber := big.NewInt( header.Number )
    // block, err := client.BlockByNumber(context.Background(), blockNumber)
	fmt.Println( header.Number )

    // if err != nil {
    //     log.Fatal(err)
    // }

    // fmt.Println(block.Number().Uint64())     // 5671744
    // fmt.Println(block.Time().Uint64())       // 1527211625
    // fmt.Println(block.Difficulty().Uint64()) // 3217000136609065
    // fmt.Println(block.Hash().Hex())          // 0x9e8751ebb5069389b855bba72d94902cc385042661498a415979b7b6ee9ba4b9
    // fmt.Println(len(block.Transactions()))   // 144

    // count, err := client.TransactionCount(context.Background(), block.Hash())
    // if err != nil {
    //     log.Fatal(err)
    // }

    // fmt.Println(count) // 144
}