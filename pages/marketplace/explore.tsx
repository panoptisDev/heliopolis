import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { IExplore } from 'components/templates/marketplace/Explore/types';
import { Explore } from 'components/templates/marketplace/Explore';
import { loadNfts } from '../api/nft/loadNfts';


const ERC20: NextPage<IExplore> = (props) => {
    return (
        <Default pageName="ERC20 Balances">
            <Explore {...props} />
        </Default>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    if (!session?.user.address) {
        return { props: { error: 'Connect your wallet first' } };
    }

    const items = await loadNfts();

    return {
        props: {
            nftsExplore: items
        },
    };
};

export default ERC20;