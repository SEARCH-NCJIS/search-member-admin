import React from 'react';
import MemberDetailCard from '../MemberDetailCard';

const MemberDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log(id);

  const response = await fetch(
    `${[process.env.NEXTAUTH_URL]}/api/member/${id}`
  ); // Dynamic route
  // Or: const response = await fetch(`/api/products?id=${id}`); // Query param
  const data = await response.json();
  console.log(data);

  // TODO: Fetch invoicing data or extract from data
  const invoicing = data.invoicing || {};

  return (
    <div className='pt-4'>
      <MemberDetailCard member={data} invoicing={invoicing} />
    </div>
  );
};

export default MemberDetailPage;
