import {
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const GameModalSkeleton = () => (
  <Box>
    <HStack px={4} py={3} mb={1}>
      <Skeleton height="24px" width="55%" />
    </HStack>

    <Box borderRadius="md" p={3} mb={4}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <GridItem>
          <Skeleton height={{ base: "200px", md: "340px" }} borderRadius="md" />
        </GridItem>
        <GridItem>
          <Skeleton height="28px" width="70%" mb={4} />
          <HStack mb={4} spacing={3}>
            <Skeleton height="60px" width="80px" borderRadius="md" />
            <Skeleton height="60px" width="80px" borderRadius="md" />
          </HStack>
          <Skeleton height="18px" width="50%" mb={2} />
          <Skeleton height="16px" width="40%" mb={4} />
          <Skeleton height="18px" width="35%" mb={2} />
          <HStack spacing={2} mb={4}>
            <Skeleton height="16px" width="80px" borderRadius="full" />
            <Skeleton height="16px" width="80px" borderRadius="full" />
          </HStack>
          <Skeleton height="16px" width="45%" />
        </GridItem>
      </Grid>
    </Box>

    <Skeleton height="18px" width="70px" mb={2} />
    <HStack mb={3} spacing={2} flexWrap="wrap">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <Skeleton key={i} height="28px" width="80px" borderRadius="full" />
        ))}
    </HStack>

    <Divider mb={3} />

    <Skeleton
      height={{ base: "180px", md: "320px" }}
      borderRadius="md"
      mb={3}
    />

    <HStack spacing={2} pb={4} overflowX="hidden">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <Skeleton
            key={i}
            height={{ base: "60px", md: "80px" }}
            minW={{ base: "90px", md: "120px" }}
            borderRadius="md"
            flexShrink={0}
          />
        ))}
    </HStack>

    <Divider mb={3} />

    <Skeleton height="18px" width="90px" mb={3} />
    <SkeletonText noOfLines={4} spacing="3" skeletonHeight="14px" />
  </Box>
);

export default GameModalSkeleton;
