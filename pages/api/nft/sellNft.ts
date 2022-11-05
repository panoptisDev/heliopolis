import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { nftMarketplaceAddress, nftAddress } from 'utils/contracts';

import { nftMarketplaceAbi } from 'utils/nftMarketplaceAbi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resellNft = async (nft: any) => {
    try{
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftMarketplaceAddress, nftMarketplaceAbi, signer);

        // const price = ethers.utils.parseUnits(nft.price.toString(), 'wei');
        // const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
        //     value: price 
        // });
        const approve = await contract.approve(nftMarketplaceAddress, nft.tokenId);
        const approve_response = await approve.wait();
        const transaction = await contract.putItemToResell(nftAddress, nft.tokenId, nft.price,
            {
                gasLimit: 1000000,
                gasPrice: ethers.utils.parseUnits("10", "gwei"),
                value: ethers.utils.parseUnits("0.001", "ether"),

            }
        );
        const response = await transaction.wait();
        console.log(response);
    }catch (e:any){
        throw e;
    }

}