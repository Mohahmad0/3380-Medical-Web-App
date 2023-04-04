import {
	VStack,
	Box,
	Input,
	CardBody,
	FormControl,
	FormLabel,
	Card,
	HStack,
	Th,
	Table,
	Tr,
	Td,
	Tbody,
	CardFooter,
	CardHeader,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import banner from '../../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import DoctorFooter from '../Footer/DoctorFooter';
import axios from 'axios';

export default function AvgBloodTest() {
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [blood, setBlood] = useState([]);
	const [good, setgood] = useState('');
	const [bad, setbad] = useState('');
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('sending:', start, end);
		axios
			.post('http://localhost:3000/doctor/averageblood', {
				start: start,
				end: end,
			})
			.then((response) => {
				console.log('response.data.results:', response.data.results);
				setBlood(response.data.results);
				setgood('kdkjfdsfjsdk');
				setbad('');
			})
			.catch((error) => {
				console.log(error);
				setgood('');
				setbad('Sorry, there was a problem');
			});
	};
	console.log('test:', blood);

	return (
		<VStack
			spacing={10}
			alignItems="flex-start"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<DoctorFooter />
			</Box>
			{bad && (
				<Card textColor="red" alignSelf="center">
					<CardFooter>{bad}</CardFooter>
				</Card>
			)}
			<Card
				bg="blue.100"
				width="95%"
				textAlign="center"
				alignSelf="center">
				<CardHeader>
					Find the average blood test results for a time period
				</CardHeader>
			</Card>
			<HStack alignSelf="center" spacing={10}>
				<form onSubmit={handleSubmit}>
					<Card height="20vh" alignSelf="center" bg="blue.100">
						<CardBody bg="white">
							<HStack>
								<FormControl>
									<VStack>
										<FormLabel>Start Date</FormLabel>
										<Box>
											<Input
												type="text"
												// value={start}
												name="start"
												onChange={(e) => {
													setStart(e.target.value);
												}}
												placeholder="YYYY-MM-DD"
											/>
										</Box>
									</VStack>
								</FormControl>

								<FormControl>
									<VStack>
										<FormLabel>End Date</FormLabel>
										<Box>
											<Input
												type="text"
												name="end"
												// value={end}
												onChange={(e) => {
													setEnd(e.target.value);
												}}
												placeholder="YYYY-MM-DD"
											/>
										</Box>
									</VStack>
								</FormControl>
							</HStack>
							<FormControl align="center" marginTop={6}>
								<Input
									width={400}
									bg="blue.100"
									type="submit"
								/>
							</FormControl>
						</CardBody>
					</Card>
				</form>

				{good && (
					<Card width={800} alignSelf="center">
						<Table colorScheme="blue" width={800}>
							<Tbody>
								<Tr bgColor="blue.100">
									<Th>RBC</Th>
									<Th>WBC</Th>
									<Th>Hemoglobin</Th>
									<Th>Hematocrit percent</Th>
									<Th>Platelets</Th>
								</Tr>
								{blood?.map((bloodtest) => (
									<Tr key={bloodtest.blood_ID}>
										<Td>{bloodtest.blo_RBC}</Td>
										<Td>{bloodtest.blo_WBC}</Td>
										<Td>{bloodtest.blo_hemoglobin}</Td>
										<Td>
											{bloodtest.blo_Hematocrit_percent}
										</Td>
										<Td>{bloodtest.blo_platelets}</Td>
									</Tr>
								))}
								<Tr bgColor="blue.100">
									<Th>Average RBC</Th>
									<Th>Average WBC</Th>
									<Th>Average Hemoglobin</Th>
									<Th>Average Hematocrit percent</Th>
									<Th>Average Platelets</Th>
								</Tr>
								<Tr>
									<Td>
										{(
											blood.reduce(
												(sum, test) =>
													sum + test.blo_RBC,
												0
											) / blood.length
										).toFixed(2)}{' '}
										Thousand
									</Td>
									<Td>
										{(
											blood.reduce(
												(sum, test) =>
													sum + test.blo_WBC,
												0
											) / blood.length
										).toFixed(2)}{' '}
										Thousand
									</Td>
									<Td>
										{(
											blood.reduce(
												(sum, test) =>
													sum + test.blo_hemoglobin,
												0
											) / blood.length
										).toFixed(2)}{' '}
										Thousand
									</Td>
									<Td>
										{(
											blood.reduce(
												(sum, test) =>
													sum +
													test.blo_Hematocrit_percent,
												0
											) / blood.length
										).toFixed(2)}
										%
									</Td>
									<Td>
										{(
											blood.reduce(
												(sum, test) =>
													sum + test.blo_platelets,
												0
											) / blood.length
										).toFixed(2)}{' '}
										Thousand
									</Td>
								</Tr>
							</Tbody>
						</Table>
					</Card>
				)}
			</HStack>
		</VStack>
	);
}