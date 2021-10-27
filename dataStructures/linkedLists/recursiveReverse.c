#include "linkedList.h"

/**
 * printList - prints the list (also recursively!)
 * @head: pointer to head of list
 * Return: pointer to head of list
 */
listint_t *printList(listint_t *head)
{
	if (head == NULL)
		return (NULL);

	/* Prints list starting at head */
	printf("DOWN = %d\n", head->n);

	/* Each stack returns reversed list not including self */
	/* At end of stack, each node adds self to list and returns */
	printList(head->next);

	/* Prints list starting at end of list */
	printf("UP = %d\n", head->n);

	return (NULL);
}

/**
 * main - Creates linked list and calls printList function
 * Return: 0 if successful
 */
int main(void)
{
	int x = 0;
	listint_t *head = NULL, *current = NULL, *prev = NULL;

	/* Create linked list in loop from 0-9 */
	while (x < 10)
	{
		current = newNode(x);

		/* If not first node, link to previous node */
		if (prev != NULL)
			prev->next = current;
		/* If first node, assign to head */
		else
			head = current;

		/* Restart loop with new prev node */
		prev = current;
		x++;
	}

	printList(head);

	free_list(head);

	return (0);
}
