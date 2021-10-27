#include "linkedList.h"

/**
 * findCycle - If loop, finds node that starts the loop
 * @list: list to partition
 * Return: node that begins the loop
 */
listint_t *findCycle(listint_t **list)
{
	/*
	 * Note: Using Floyd's Cycle-Finding Algorithm
	 * If fast is twice as fast as slow in a loop, they will meet
	 * By the time they meet, fast will have travelled twice as far
	 * Slow travels to start of list + to meeting place, fast travels 2x distance
	 * Same distance + ? to start of loop + to meeting place
	 * (2(Loop + Meet)) == (Loop + ? + 2(Meet)) SO ? is same distance as Loop
	 * Distance to start is distance to beginning of loop
	*/

	/* Pointers */
	listint_t *slow = *list;
	listint_t *fast = *list;
	int flag = 0;

	while (slow && fast && fast->next)
	{
		slow = slow->next;
		fast = fast->next->next;

		/* If fast and slow meet, there is a loop */
		if (slow == fast)
		{
			flag = 1;
			break;
		}
	}

	if (flag == 0)
		return (NULL);

	/* Start slow from beginning of list again */
	slow = *list;

	/* Move slow and fast at same speed until they meet */
	while (slow != fast)
	{
		slow = slow->next;
		fast = fast->next;
	}

	return (slow);
}

/**
 * main - check the code for Holberton School students.
 * Return: Always 0.
 */
int main(void)
{
	listint_t *head = NULL;
	listint_t *current;
	listint_t *temp;
	int i;

	/* Create linked list by adding numbers to head */
	add_node_to_list(&head, 0);
	add_node_to_list(&head, 1);
	add_node_to_list(&head, 2);
	add_node_to_list(&head, 3);
	add_node_to_list(&head, 4);
	add_node_to_list(&head, 98);
	add_node_to_list(&head, 402);
	add_node_to_list(&head, 1024);

	/* Print created list */
	print_list(head);
	printf("\n");

	/* Check if list has loop */
	if (findCycle(&head) == NULL)
		printf("Linked list has no cycle\n");
	else
		printf("Linked list has a cycle\n");

	/* Create loop */
	current = head;
	for (i = 0; i < 4; i++)
		current = current->next;
	temp = current->next;
	current->next = head;

	// /* Print created list - commented out because it's a loop */
	// print_list(head);

	if (findCycle(&head) == NULL)
		printf("Linked list has no cycle\n");
	else
		printf("Linked list has a cycle\n");

	/* Unloop so can free */
	current = head;
	for (i = 0; i < 4; i++)
		current = current->next;
	current->next = temp;

	free_list(head);

	return (0);
}
