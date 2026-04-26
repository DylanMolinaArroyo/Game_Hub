import { Card, CardBody, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => (
  <Card borderRadius="md" overflow="hidden">
    <Skeleton height={{ base: "160px", md: "200px" }} />
    <CardBody>
      <HStack justifyContent="space-between" mb={3}>
        <Skeleton height="18px" width="45%" />
        <Skeleton height="22px" width="36px" borderRadius="md" />
      </HStack>
      <SkeletonText noOfLines={1} skeletonHeight="22px" />
    </CardBody>
  </Card>
);

export default GameCardSkeleton;
