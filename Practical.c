#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};


struct Node* createNode(int data) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = NULL;

    return newNode;
}


void insertMiddle(struct Node **head, int data) {
    struct Node *newNode = createNode(data);


    if (*head == NULL) {
        *head = newNode;
        return;
    }

    struct Node *slow = *head;
    struct Node *fast = *head;
    struct Node *prev = NULL;

    while (fast != NULL && fast->next != NULL) {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }


    if (prev == NULL) {
        newNode->next = *head;
        *head = newNode;
    } else {
        newNode->next = slow;
        prev->next = newNode;
    }
}


void deleteLast(struct Node **head) {

    if (*head == NULL) {
        printf("List is empty\n");
        return;
    }


    if ((*head)->next == NULL) {
        free(*head);
        *head = NULL;
        return;
    }

    struct Node *temp = *head;

  
    while (temp->next->next != NULL) {
        temp = temp->next;
    }

    free(temp->next);
    temp->next = NULL;
}

void display(struct Node *head) {
    struct Node *temp = head;

    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }

    printf("NULL\n");
}

int main() {
    struct Node *head = NULL;


    head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);
    head->next->next->next = createNode(40);

    printf("Original List:\n");
    display(head);


    insertMiddle(&head, 25);

    printf("\nAfter inserting 25 in middle:\n");
    display(head);

    deleteLast(&head);

    printf("\nAfter deleting last node:\n");
    display(head);

    return 0;
}