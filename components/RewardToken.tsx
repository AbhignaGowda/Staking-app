import { Card, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES } from "../cost/addresses";

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(REWARD_TOKEN_ADDRESSES);
    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
    
    return (
        <Card
            p={5}
            boxShadow="inset 0px 0px 10px rgba(255, 255, 255, 0.5), 0px 0px 20px rgba(255, 255, 255, 0.4)" // White box shadow
            bg="rgba(255, 255, 255, 0.2)"
            borderWidth="1px"
            borderColor="rgba(21, 0, 255, 0.1)"
            color="rgb(220, 221, 222)"
            _hover={{ boxShadow: "inset 0px 0px 10px rgba(255, 255, 255, 0.7), 0px 0px 30px rgba(255, 255, 255, 0.7)" }} // Adjusted shadow on hover
            _focus={{ boxShadow: "outline" }}
            _active={{ boxShadow: "none" }}
            style={{
                WebkitBackdropFilter: "blur(5px)",
                backdropFilter: "blur(5px)"
            }}
        >
            <Stack>
                <Heading>Reward Token</Heading>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <Text fontSize={"large"} fontWeight={"bold"}>${tokenBalance?.symbol}</Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <Text>{tokenBalance?.displayValue}</Text>
                </Skeleton>
            </Stack>
        </Card>
    )
}
