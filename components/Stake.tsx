import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"; // Import Button from Chakra UI
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  REWARD_TOKEN_ADDRESSES,
  STAKE_CONTRACT_ADDRESSES,
  STAKE_TOKEN_ADDRESSES,
} from "../cost/addresses";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Stake() {
  const address = useAddress();
  const toast = useToast();

  const { contract: stakeTokenContract } = useContract(
    STAKE_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    REWARD_TOKEN_ADDRESSES,
    "token"
  );
  const { contract: stakeContract } = useContract(
    STAKE_CONTRACT_ADDRESSES,
    "custom"
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchStakeInfo();
    }, 10000);

    return () => clearInterval(interval); // Cleanup function
  }, [refetchStakeInfo]);

  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  // Define a function to determine button colors based on their function
  function getButtonColor(action: string) {
    switch (action) {
      case "stake":
        return "green"; // Change to desired color for stake button
      case "unstake":
        return "red"; // Change to desired color for unstake button
      case "claim":
        return "blue"; // Change to desired color for claim button
      default:
        return "gray"; // Default color
    }
  }

  const innerCardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    // boxShadow: "0 8px 16px rgba(255, 255, 255, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
    WebkitBackdropFilter: "blur(5px)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(21, 0, 255, 0.1)",
    color: "rgb(220, 221, 222)",
    borderRadius: "10px",
  };
  const OuterCardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow:"inset 0px 0px 10px rgba(255, 255, 255, 0.5), 0px 0px 20px rgba(255, 255, 255, 0.4)",// White box shadow
    WebkitBackdropFilter: "blur(5px)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(21, 0, 255, 0.1)",
    color: "rgb(220, 221, 222)",
    borderRadius: "10px",
  };

  return (
    <Card p={5} mt={10} style={OuterCardStyle}>
      <Heading>Earn Reward Token</Heading>
      <SimpleGrid columns={2}>
        <Card p={5} m={5} style={innerCardStyle}>
          <Box textAlign={"center"} mb={5}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Stake Token:
            </Text>
            <Skeleton isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance}>
              {stakeInfo && stakeInfo[0] ? (
                <Text>
                  {ethers.utils.formatEther(stakeInfo[0])}
                  {" $" + stakeTokenBalance?.symbol}
                </Text>
              ) : (
                <Text>0</Text>
              )}
            </Skeleton>
          </Box>
          <SimpleGrid columns={2} spacing={4}>
            <Stack spacing={4}>
              <Input
                type="number"
                max={stakeTokenBalance?.displayValue}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
              <Button
                colorScheme={getButtonColor("stake")} // Change "stake" to appropriate action
                onClick={async () => {
                  // Button action logic
                  await stakeTokenContract?.erc20.setAllowance(
                    STAKE_CONTRACT_ADDRESSES,
                    stakeAmount
                  );
                  await stakeContract?.call("stake", [
                    ethers.utils.parseEther(stakeAmount),
                  ]);
                  resetValue();
                  toast({
                    title: "Stake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                Stake
              </Button>
            </Stack>
            <Stack spacing={4}>
              <Input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
              />
              <Button
                colorScheme={getButtonColor("unstake")} // Change "unstake" to appropriate action
                onClick={async () => {
                  // Button action logic
                  await stakeContract?.call("withdraw", [
                    ethers.utils.parseEther(unstakeAmount),
                  ]);
                  resetValue();
                  toast({
                    title: "Unstake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                Unstake
              </Button>
            </Stack>
          </SimpleGrid>
        </Card>
        <Card p={5} m={5} style={innerCardStyle}>
          <Flex
            h={"100%"}
            justifyContent={"space-between"}
            direction={"column"}
            textAlign={"center"}
          >
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Reward Token:
            </Text>
            <Skeleton
              isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}
            >
              {stakeInfo && stakeInfo[0] ? (
                <Box>
                  <Text fontSize={"xl"} fontWeight={"bold"}>
                    {ethers.utils.formatEther(stakeInfo[1])}
                  </Text>
                  <Text>{" $" + rewardTokenBalance?.symbol}</Text>
                </Box>
              ) : (
                <Text>0</Text>
              )}
            </Skeleton>
            <Button
              colorScheme={getButtonColor("claim")} // Change "claim" to appropriate action
              onClick={async () => {
                // Button action logic
                await stakeContract?.call("claimRewards");
                console.log("Claimed");
                resetValue();
                toast({
                  title: "Rewards Claimed",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Claim
            </Button>
          </Flex>
        </Card>
      </SimpleGrid>
    </Card>
  );
}
